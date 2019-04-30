package cn.ivisionchina.ivcenterserver.web.rest;

import cn.ivisionchina.ivcenterserver.IvcenterserverApp;

import cn.ivisionchina.ivcenterserver.domain.DailyReport;
import cn.ivisionchina.ivcenterserver.repository.DailyReportRepository;
import cn.ivisionchina.ivcenterserver.service.DailyReportService;
import cn.ivisionchina.ivcenterserver.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static cn.ivisionchina.ivcenterserver.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DailyReportResource REST controller.
 *
 * @see DailyReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IvcenterserverApp.class)
public class DailyReportResourceIntTest {

    private static final Long DEFAULT_REPORT_DATE = 1L;
    private static final Long UPDATED_REPORT_DATE = 2L;

    private static final Long DEFAULT_START_TIME = 1L;
    private static final Long UPDATED_START_TIME = 2L;

    private static final Long DEFAULT_END_TIME = 1L;
    private static final Long UPDATED_END_TIME = 2L;

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private DailyReportRepository dailyReportRepository;

    @Autowired
    private DailyReportService dailyReportService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDailyReportMockMvc;

    private DailyReport dailyReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DailyReportResource dailyReportResource = new DailyReportResource(dailyReportService);
        this.restDailyReportMockMvc = MockMvcBuilders.standaloneSetup(dailyReportResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DailyReport createEntity(EntityManager em) {
        DailyReport dailyReport = new DailyReport()
            .reportDate(DEFAULT_REPORT_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .content(DEFAULT_CONTENT);
        return dailyReport;
    }

    @Before
    public void initTest() {
        dailyReport = createEntity(em);
    }

    @Test
    @Transactional
    public void createDailyReport() throws Exception {
        int databaseSizeBeforeCreate = dailyReportRepository.findAll().size();

        // Create the DailyReport
        restDailyReportMockMvc.perform(post("/api/daily-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dailyReport)))
            .andExpect(status().isCreated());

        // Validate the DailyReport in the database
        List<DailyReport> dailyReportList = dailyReportRepository.findAll();
        assertThat(dailyReportList).hasSize(databaseSizeBeforeCreate + 1);
        DailyReport testDailyReport = dailyReportList.get(dailyReportList.size() - 1);
        assertThat(testDailyReport.getReportDate()).isEqualTo(DEFAULT_REPORT_DATE);
        assertThat(testDailyReport.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testDailyReport.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testDailyReport.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createDailyReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dailyReportRepository.findAll().size();

        // Create the DailyReport with an existing ID
        dailyReport.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDailyReportMockMvc.perform(post("/api/daily-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dailyReport)))
            .andExpect(status().isBadRequest());

        // Validate the DailyReport in the database
        List<DailyReport> dailyReportList = dailyReportRepository.findAll();
        assertThat(dailyReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDailyReports() throws Exception {
        // Initialize the database
        dailyReportRepository.saveAndFlush(dailyReport);

        // Get all the dailyReportList
        restDailyReportMockMvc.perform(get("/api/daily-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dailyReport.getId().intValue())))
            .andExpect(jsonPath("$.[*].reportDate").value(hasItem(DEFAULT_REPORT_DATE.intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.intValue())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getDailyReport() throws Exception {
        // Initialize the database
        dailyReportRepository.saveAndFlush(dailyReport);

        // Get the dailyReport
        restDailyReportMockMvc.perform(get("/api/daily-reports/{id}", dailyReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dailyReport.getId().intValue()))
            .andExpect(jsonPath("$.reportDate").value(DEFAULT_REPORT_DATE.intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.intValue()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDailyReport() throws Exception {
        // Get the dailyReport
        restDailyReportMockMvc.perform(get("/api/daily-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDailyReport() throws Exception {
        // Initialize the database
        dailyReportService.save(dailyReport);

        int databaseSizeBeforeUpdate = dailyReportRepository.findAll().size();

        // Update the dailyReport
        DailyReport updatedDailyReport = dailyReportRepository.findById(dailyReport.getId()).get();
        // Disconnect from session so that the updates on updatedDailyReport are not directly saved in db
        em.detach(updatedDailyReport);
        updatedDailyReport
            .reportDate(UPDATED_REPORT_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .content(UPDATED_CONTENT);

        restDailyReportMockMvc.perform(put("/api/daily-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDailyReport)))
            .andExpect(status().isOk());

        // Validate the DailyReport in the database
        List<DailyReport> dailyReportList = dailyReportRepository.findAll();
        assertThat(dailyReportList).hasSize(databaseSizeBeforeUpdate);
        DailyReport testDailyReport = dailyReportList.get(dailyReportList.size() - 1);
        assertThat(testDailyReport.getReportDate()).isEqualTo(UPDATED_REPORT_DATE);
        assertThat(testDailyReport.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testDailyReport.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testDailyReport.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingDailyReport() throws Exception {
        int databaseSizeBeforeUpdate = dailyReportRepository.findAll().size();

        // Create the DailyReport

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDailyReportMockMvc.perform(put("/api/daily-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dailyReport)))
            .andExpect(status().isBadRequest());

        // Validate the DailyReport in the database
        List<DailyReport> dailyReportList = dailyReportRepository.findAll();
        assertThat(dailyReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDailyReport() throws Exception {
        // Initialize the database
        dailyReportService.save(dailyReport);

        int databaseSizeBeforeDelete = dailyReportRepository.findAll().size();

        // Delete the dailyReport
        restDailyReportMockMvc.perform(delete("/api/daily-reports/{id}", dailyReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DailyReport> dailyReportList = dailyReportRepository.findAll();
        assertThat(dailyReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DailyReport.class);
        DailyReport dailyReport1 = new DailyReport();
        dailyReport1.setId(1L);
        DailyReport dailyReport2 = new DailyReport();
        dailyReport2.setId(dailyReport1.getId());
        assertThat(dailyReport1).isEqualTo(dailyReport2);
        dailyReport2.setId(2L);
        assertThat(dailyReport1).isNotEqualTo(dailyReport2);
        dailyReport1.setId(null);
        assertThat(dailyReport1).isNotEqualTo(dailyReport2);
    }
}

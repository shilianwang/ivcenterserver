package cn.ivisionchina.ivcenterserver.web.rest;
import cn.ivisionchina.ivcenterserver.domain.DailyReport;
import cn.ivisionchina.ivcenterserver.service.DailyReportService;
import cn.ivisionchina.ivcenterserver.web.rest.errors.BadRequestAlertException;
import cn.ivisionchina.ivcenterserver.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DailyReport.
 */
@RestController
@RequestMapping("/api")
public class DailyReportResource {

    private final Logger log = LoggerFactory.getLogger(DailyReportResource.class);

    private static final String ENTITY_NAME = "dailyReport";

    private final DailyReportService dailyReportService;

    public DailyReportResource(DailyReportService dailyReportService) {
        this.dailyReportService = dailyReportService;
    }

    /**
     * POST  /daily-reports : Create a new dailyReport.
     *
     * @param dailyReport the dailyReport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dailyReport, or with status 400 (Bad Request) if the dailyReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/daily-reports")
    public ResponseEntity<DailyReport> createDailyReport(@RequestBody DailyReport dailyReport) throws URISyntaxException {
        log.debug("REST request to save DailyReport : {}", dailyReport);
        if (dailyReport.getId() != null) {
            throw new BadRequestAlertException("A new dailyReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DailyReport result = dailyReportService.save(dailyReport);
        return ResponseEntity.created(new URI("/api/daily-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /daily-reports : Updates an existing dailyReport.
     *
     * @param dailyReport the dailyReport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dailyReport,
     * or with status 400 (Bad Request) if the dailyReport is not valid,
     * or with status 500 (Internal Server Error) if the dailyReport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/daily-reports")
    public ResponseEntity<DailyReport> updateDailyReport(@RequestBody DailyReport dailyReport) throws URISyntaxException {
        log.debug("REST request to update DailyReport : {}", dailyReport);
        if (dailyReport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DailyReport result = dailyReportService.save(dailyReport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dailyReport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /daily-reports : get all the dailyReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dailyReports in body
     */
    @GetMapping("/daily-reports")
    public List<DailyReport> getAllDailyReports() {
        log.debug("REST request to get all DailyReports");
        return dailyReportService.findAll();
    }

    /**
     * GET  /daily-reports/:id : get the "id" dailyReport.
     *
     * @param id the id of the dailyReport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dailyReport, or with status 404 (Not Found)
     */
    @GetMapping("/daily-reports/{id}")
    public ResponseEntity<DailyReport> getDailyReport(@PathVariable Long id) {
        log.debug("REST request to get DailyReport : {}", id);
        Optional<DailyReport> dailyReport = dailyReportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dailyReport);
    }

    /**
     * DELETE  /daily-reports/:id : delete the "id" dailyReport.
     *
     * @param id the id of the dailyReport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/daily-reports/{id}")
    public ResponseEntity<Void> deleteDailyReport(@PathVariable Long id) {
        log.debug("REST request to delete DailyReport : {}", id);
        dailyReportService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

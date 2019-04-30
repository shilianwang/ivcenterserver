package cn.ivisionchina.ivcenterserver.service.impl;

import cn.ivisionchina.ivcenterserver.service.DailyReportService;
import cn.ivisionchina.ivcenterserver.domain.DailyReport;
import cn.ivisionchina.ivcenterserver.repository.DailyReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing DailyReport.
 */
@Service
@Transactional
public class DailyReportServiceImpl implements DailyReportService {

    private final Logger log = LoggerFactory.getLogger(DailyReportServiceImpl.class);

    private final DailyReportRepository dailyReportRepository;

    public DailyReportServiceImpl(DailyReportRepository dailyReportRepository) {
        this.dailyReportRepository = dailyReportRepository;
    }

    /**
     * Save a dailyReport.
     *
     * @param dailyReport the entity to save
     * @return the persisted entity
     */
    @Override
    public DailyReport save(DailyReport dailyReport) {
        log.debug("Request to save DailyReport : {}", dailyReport);
        return dailyReportRepository.save(dailyReport);
    }

    /**
     * Get all the dailyReports.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DailyReport> findAll() {
        log.debug("Request to get all DailyReports");
        return dailyReportRepository.findAll();
    }


    /**
     * Get one dailyReport by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DailyReport> findOne(Long id) {
        log.debug("Request to get DailyReport : {}", id);
        return dailyReportRepository.findById(id);
    }

    /**
     * Delete the dailyReport by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DailyReport : {}", id);
        dailyReportRepository.deleteById(id);
    }
}

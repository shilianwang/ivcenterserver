package cn.ivisionchina.ivcenterserver.service;

import cn.ivisionchina.ivcenterserver.domain.DailyReport;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DailyReport.
 */
public interface DailyReportService {

    /**
     * Save a dailyReport.
     *
     * @param dailyReport the entity to save
     * @return the persisted entity
     */
    DailyReport save(DailyReport dailyReport);

    /**
     * Get all the dailyReports.
     *
     * @return the list of entities
     */
    List<DailyReport> findAll();


    /**
     * Get the "id" dailyReport.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DailyReport> findOne(Long id);

    /**
     * Delete the "id" dailyReport.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

package cn.ivisionchina.ivcenterserver.repository;

import cn.ivisionchina.ivcenterserver.domain.DailyReport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DailyReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DailyReportRepository extends JpaRepository<DailyReport, Long> {

}

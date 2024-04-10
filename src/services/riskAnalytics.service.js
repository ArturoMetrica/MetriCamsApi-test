const { query } = require('./dbconnection');

class RiskAnalytics {
    getRiskAnalytics = async (token, serials, fromDate, toDate, rowsOffset, rowsLimit, offset) => {
        try {
            const result = await query('SELECT * FROM get_risk_analytics_fn($1::TEXT,$2::TEXT[],$3::TIMESTAMP(0),$4::TIMESTAMP(0),$5::INTEGER,$6::INTEGER,$7::INTEGER) as QUERY', [
                token,
                serials,
                fromDate,
                toDate,
                rowsOffset,
                rowsLimit,
                offset
            ]);

            if (result[0] && result[0].query.data) return result[0].query.data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RiskAnalytics();
import {
    IChip,
    IHealthCheckServiceMetric,
} from '../interfaces/healthCheck.interface';

export const getChipsDataForServiceHealthCheck = (
    metrics: IHealthCheckServiceMetric[],
): IChip[] => {
    return metrics.map((metric) => {
        if (metric.metricType === 'Default') {
            return {
                type: 'success',
                text: metric.name,
                tooltipText: metric.value,
            };
        } else if (metric.metricType === 'ErrorCount') {
            return {
                type: 'error',
                text: metric.name + ' ' + metric.value,
            };
        } else {
            return {
                type: 'warning',
                text: metric.name,
                tooltipText: metric.value,
            };
        }
    });
};

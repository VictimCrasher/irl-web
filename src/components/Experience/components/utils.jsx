import ImageLazy from '../../../assets/components/ImageLazy';
import moment from 'moment';

export const renderImage = (icon, logo, alt) => {
  if (icon) return icon;
  if (logo) {
    return <ImageLazy src={logo} alt={alt} width="100%" height="auto" style={{ width: '100%' }} />;
  }
  return null;
};

export const getDuration = (startDate, endDate) => {
  const totalMonths = moment(endDate).diff(moment(startDate), 'months');
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  let yearLabel = '';
  let monthLabel = '';

  if (years === 1) yearLabel = 'year';
  if (years > 1) yearLabel = 'years';
  if (months === 1) monthLabel = 'month';
  if (months > 1) monthLabel = 'months';

  if (years === 0) return `${months} ${monthLabel}`;
  if (months === 0) return `${years} ${yearLabel}`;

  return `${years} ${yearLabel} ${months} ${monthLabel}`;
};

import SectionWrapper from '../../assets/components/SectionWrapper';
import { WORK_EXPERIENCE, EDUCATION, ORGANIZATION_EXPERIENCE } from '../../data/experience';
import TimelineWrapper from './components/TimelineWrapper';
import ExperienceItem from './components/ExperienceItem';
import EducationItem from './components/EducationItem';

const Experience = () => {
  return (
    <section id="experience">
      <SectionWrapper maxWidth="lg" title="Work Experience">
        <TimelineWrapper>
          {WORK_EXPERIENCE.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </TimelineWrapper>
      </SectionWrapper>
      <SectionWrapper maxWidth="lg" title="Education">
        <TimelineWrapper>
          {EDUCATION.map((education, index) => (
            <EducationItem key={index} {...education} />
          ))}
        </TimelineWrapper>
      </SectionWrapper>
      <SectionWrapper maxWidth="lg" title="Organization Experience">
        <TimelineWrapper>
          {ORGANIZATION_EXPERIENCE.map((organization, index) => (
            <ExperienceItem key={index} {...organization} />
          ))}
        </TimelineWrapper>
      </SectionWrapper>
    </section>
  );
};

export default Experience;

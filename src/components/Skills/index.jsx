import { Stack, Typography, Chip } from '@mui/material';
import SectionWrapper from '../../assets/components/SectionWrapper';
import { LANGUAGES, TECHNICAL_SKILLS, TOOLS } from '../../data/skills';

const Skills = () => {
  return (
    <SectionWrapper maxWidth="lg" id="skills" title="Skills">
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ lineHeight: 1 }}>
          Languages
        </Typography>
        <Stack direction="row" columnGap={0.5} rowGap={1} flexWrap="wrap">
          {LANGUAGES.map((language, index) => (
            <Chip
              key={index}
              label={
                <Stack direction="row" gap={0.5}>
                  <Typography variant="body1">{language.language}</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ({language.level})
                  </Typography>
                </Stack>
              }
              variant="outlined"
              sx={{ width: 'fit-content' }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ lineHeight: 1 }}>
          Technical Skills
        </Typography>
        {TECHNICAL_SKILLS.map((skill, index) => (
          <Stack key={index} spacing={2} width="100%">
            <Typography variant="h6" fontWeight={500} sx={{ lineHeight: 1 }}>
              {skill.label}
            </Typography>
            <Stack direction="row" columnGap={0.5} rowGap={1} flexWrap="wrap">
              {skill.values.map((value, index) => (
                <Chip key={index} label={value} variant="outlined" sx={{ width: 'fit-content' }} />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ lineHeight: 1 }}>
          Tools
        </Typography>
        <Stack direction="row" columnGap={0.5} rowGap={1} flexWrap="wrap">
          {TOOLS.map((tool, index) => (
            <Chip key={index} label={tool} variant="outlined" sx={{ width: 'fit-content' }} />
          ))}
        </Stack>
      </Stack>
    </SectionWrapper>
  );
};

export default Skills;

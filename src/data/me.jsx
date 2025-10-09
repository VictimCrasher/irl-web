import { Link, Typography } from '@mui/material';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  GitlabLogoIcon,
  CodesandboxLogoIcon,
  YoutubeLogoIcon,
  MediumLogoIcon,
  CodepenLogoIcon
} from '@phosphor-icons/react';

import cv from './files/CV.pdf';
import photo from './images/me.png';

export const ME = {
  name: 'Achmad Firdaus Adinegoro',
  description: [
    "I'm a result-oriented technology professional with proven versatility across web development, machine learning, and graphic design.",
    'Consistently delivers high-quality work on time, demonstrating a strong ability to quickly master new technologies and domains.'
  ],
  cv: cv,
  photo: photo,
  details: [
    {
      name: 'Date of Birth',
      value: 'Jakarta, November 8th 1997'
    },
    {
      name: 'Current Residence',
      value: 'Jakarta, Indonesia'
    },
    {
      name: 'Nationality',
      value: 'Indonesia'
    },
    {
      name: 'Email',
      value: (
        <Link href="mailto:achmadfirdausadinegoro@gmail.com">
          <Typography variant="body1">achmadfirdausadinegoro@gmail.com</Typography>
        </Link>
      )
    }
  ],
  links: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/achmadfirdausadinegoro/',
      icon: <LinkedinLogoIcon size={48} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/VictimCrasher',
      icon: <GithubLogoIcon size={48} />
    },
    {
      name: 'GitLab',
      url: 'https://gitlab.com/victim_crasher',
      icon: <GitlabLogoIcon size={48} />
    },
    {
      name: 'CodePen',
      url: 'https://codepen.io/victim_crasher',
      icon: <CodepenLogoIcon size={48} />
    },
    {
      name: 'CodeSandbox',
      url: 'https://codesandbox.io/u/Victim_Crasher',
      icon: <CodesandboxLogoIcon size={48} />
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@Victim_Crasher',
      icon: <YoutubeLogoIcon size={48} />
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@achmadfirdausadinegoro',
      icon: <MediumLogoIcon size={48} />
    }
  ]
};

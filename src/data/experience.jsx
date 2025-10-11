import wasimil from './images/wasimil.png';
import visi from './images/vpn.png';
import delligence from './images/delligence.png';
import vifthFloor from './images/vifth-floor.png';
import csui from './images/csui.png';
import ui from './images/ui.png';
import bem from './images/bem.png';
import ristek from './images/ristek.png';
import { PaintBrushIcon } from '@phosphor-icons/react';

const sortByEndDate = (a, b) => {
  const bEndDate = b.endDate === 'now' ? new Date() : new Date(b.endDate);
  const aEndDate = a.endDate === 'now' ? new Date() : new Date(a.endDate);
  return bEndDate - aEndDate;
};

export const WORK_EXPERIENCE = [
  {
    logo: null,
    icon: <PaintBrushIcon size={48} color="white" />,
    institution: 'Self-Employed',
    position: 'Commission-based Freelancer',
    location: 'Jakarta, Indonesia',
    startDate: '2020-11-01',
    endDate: 'now',
    keyTechnologies: ['Vanilla JS', 'css', 'websocket', 'graphic design'],
    description: [
      'Working on various commission and project to design and implement a widget web-app for a game called “osu!”. The app takes data from the game to a more presentable viewer friendly design for various streamer using HTML, CSS, and JavaScript.'
    ]
  },
  {
    logo: wasimil,
    icon: null,
    institution: 'Azoo Inc. (Wasimil)',
    position: 'Frontend Developer',
    location: 'Kyoto, Japan (Remote)',
    startDate: '2023-05-22',
    endDate: '2025-10-03',
    keyTechnologies: ['Python', 'ReactJS', 'Material UI', 'GraphQL', 'hasura', 'Figma'],
    description: [
      'Developed and supported a hotel management system serving 200,000+ users, actively contributing to new feature implementation with stakeholders.',
      'Contribute the whole end-to-end development process of various critical features and standalone applications, leveraging client feedback and real-world analytics for data-driven design and implementation.',
      'Leverages AI/LLM based tools to maximize productivity and optimize development process.'
    ]
  },
  {
    logo: visi,
    icon: null,
    institution: 'PT. Visi Prima Nusantara',
    position: 'Frontend Developer',
    location: 'Jakarta, Indonesia',
    startDate: '2021-02-01',
    endDate: '2023-05-19',
    keyTechnologies: ['ReactJS', 'Bootstrap', 'scss', 'TinyMCE', 'xhtml2pdf', 'Adobe XD'],
    description: [
      'Developed and maintained core features for school management and learning platform used by 900+ institutions and 400,000+ users, collaborating with local and international teams.',
      'Served as PIC and sole front-end developer for college information gateway, building and maintaining from scratch, collaborating with designer and QA to deliver the app in record time.'
    ]
  },
  {
    logo: delligence,
    icon: null,
    institution: 'PT. Solusi Teknologi Cerdas (Delligence AI)',
    position: 'AI Software Engineer',
    location: 'Jakarta, Indonesia (Remote)',
    startDate: '2018-06-01',
    endDate: '2020-12-25',
    keyTechnologies: ['Python', 'keras', 'tensorflow', 'PyTorch', 'NumPy', 'pandas', 'OpenCV'],
    description: [
      'Led car brand/model detection projects for up to 200 local and international car brands using cutting-edge AI on image and video.',
      'Served as PIC for Computer Vision-based crowd management, including safety gear compliance, gender/age inference, mask compliance, and social distancing detection.'
    ]
  },
  {
    logo: vifthFloor,
    icon: null,
    institution: 'Vifth Floor',
    position: 'Game Designer, UI/UX, Level Designer Intern',
    location: 'Depok, Indonesia',
    startDate: '2017-06-01',
    endDate: '2018-06-01',
    keyTechnologies: ['Unity', 'Adobe Photoshop', 'Adobe Illustrator', 'HTML', 'CSS', 'JavaScript'],
    description: [
      'Contribute to the development of various game projects, including UI/UX, level design, and game design.',
      'Contribute in the website redesign of the biggest community led pop-culture event in Indonesia, Comic Frontier 9 (2017), where the company was the main sponsor.'
    ]
  },
  {
    logo: csui,
    icon: null,
    institution: 'Faculty of Computer Science, Universitas Indonesia',
    position: 'Assistant Lecturer',
    location: 'Depok, Indonesia',
    startDate: '2017-01-01',
    endDate: '2018-06-01',
    keyTechnologies: ['C', 'MIPS', 'Java', 'Python'],
    description: [
      'Help students with their assignments and projects, and also help them with their exams.',
      'Conduct regular lab sessions to help students understand the concepts of the course.',
      'Collaborate with lecturers to improve the course content and teaching materials.'
    ]
  },
  {
    logo: csui,
    icon: null,
    institution: 'Faculty of Computer Science, Universitas Indonesia',
    position: 'Graphic Designer Intern',
    location: 'Depok, Indonesia',
    startDate: '2016-06-01',
    endDate: '2016-11-01',
    keyTechnologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe Premiere Pro'],
    description: [
      "Doing layouting, designing, and photo editing for the Public Relations' Annual Magazine.",
      'Contributed as a designer for the Annual Inter-university IT Competition (Gemastik 8).'
    ]
  }
].sort(sortByEndDate);

export const EDUCATION = [
  {
    logo: ui,
    icon: null,
    institution: 'Universitas Indonesia',
    degree: 'Bachelor of Science (S1)',
    major: 'Computer Science',
    location: 'Depok, Indonesia',
    startDate: '2015-07-09',
    endDate: '2019-01-30',
    gpa: '3.71',
    scale: '4.00',
    description: ['Graduated with an honor of Cum Laude.', 'Able to finish the whole program in 3.5 years.']
  }
].sort(sortByEndDate);

export const ORGANIZATION_EXPERIENCE = [
  {
    logo: ristek,
    icon: null,
    institution: 'Riset dan Teknologi (RISTEK) Fakultas Ilmu Komputer, Universitas Indonesia',
    position: 'Staff & Senior Staff of Game Development',
    location: 'Depok, Indonesia',
    startDate: '2016-01-01',
    endDate: '2017-12-31',
    keyTechnologies: ['Unity', 'C#', 'Adobe Photoshop', 'Adobe Illustrator'],
    description: [
      'Contribute to the development of various game projects, including UI/UX, level design, and game design.',
      'Participate in various activities, including Game Jam and Game Development Competition.',
      'Mentor and guide junior members in the department.'
    ]
  },
  {
    logo: bem,
    icon: null,
    institution: 'Badan Eksekutif Mahasiswa (BEM) Fakultas Ilmu Komputer, Universitas Indonesia',
    position: 'Staff of Media',
    location: 'Depok, Indonesia',
    startDate: '2016-01-01',
    endDate: '2016-12-22',
    keyTechnologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro'],
    description: [
      'Responsible in creating publication material (brochure, poster, videos, etc). Ensures that every publication out from the organization has a distinguishable trademark.',
      'Participate as a designer, curator, and organizer of regular organization magazines.'
    ]
  }
].sort(sortByEndDate);

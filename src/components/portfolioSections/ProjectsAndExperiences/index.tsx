import {Link} from '@constants';
import React from 'react';
import Experiences from './Experiences';
import Projects from './Projects';
import S from './ProjectsAndExperiences.module.css';

type ProjectsAndExperiencesProps = {
  projects: IProject[];
  experiences: IExperience[];
};

const ProjectsAndExperiences = React.forwardRef<HTMLDivElement, ProjectsAndExperiencesProps>(
  ({projects, experiences}, ref) => {
    return (
      <section ref={ref} className={S.container} id={Link.PROJECTS_AND_EXPERIENCES}>
        <Experiences experiences={experiences} />
        <Projects projects={projects} />
      </section>
    );
  },
);

export default ProjectsAndExperiences;

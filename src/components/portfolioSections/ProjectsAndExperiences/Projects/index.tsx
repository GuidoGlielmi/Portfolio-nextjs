import usePaintOnStickyElementScroll from '@hooks/usePaintOnStickyElementScroll';
import useTranslation from 'hooks/useTranslation';
import React, {useRef} from 'react';
import ProjectItem from './ProjectItem/ProjectItem';

type ProjectsProps = {
  projects: IProject[];
};

const Projects: React.FC<ProjectsProps> = ({projects}) => {
  const [projectsTitle] = useTranslation('Projects');

  const titleRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  usePaintOnStickyElementScroll('#eee', '#333', titleRef, titleContainerRef);

  return (
    <div ref={titleContainerRef}>
      <h2 ref={titleRef}>{projectsTitle}</h2>
      {projects.map(p => (
        <ProjectItem project={p} key={p.title} />
      ))}
    </div>
  );
};

export default Projects;

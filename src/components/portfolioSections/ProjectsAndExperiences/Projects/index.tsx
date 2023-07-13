import {IProject} from 'IPortfolio';
import React, {useEffect, useRef} from 'react';
import ProjectItem from './ProjectItem/ProjectItem';
import useTranslation from 'hooks/useTranslation';

type ProjectsProps = {
  projects: IProject[];
};

const Projects: React.FC<ProjectsProps> = ({projects}) => {
  const [projectsTitle] = useTranslation('Projects');

  const titleRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paintBackground = () => {
      // console.log(containerRef.current!.offsetTop);
      // console.log(titleRef.current!.offsetTop);
      if (titleRef.current!.offsetTop > titleContainerRef.current!.offsetTop) {
        titleRef.current!.style.background = '#eee';
        titleRef.current!.style.color = '#333';
      } else {
        titleRef.current!.style.background = 'transparent';
        titleRef.current!.style.color = '';
      }
    };
    paintBackground();
    document!.addEventListener('scroll', paintBackground);
    return () => {
      document!.removeEventListener('scroll', paintBackground);
    };
  }, []);
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

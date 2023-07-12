import {IProject} from 'IPortfolio';
import React, {useEffect, useRef} from 'react';
import ProjectItem from './ProjectItem/ProjectItem';
import useTranslation from 'hooks/useTranslation';

type ProjectsProps = {
  projects: IProject[];
};
let initialOffsetTop: number;
const Projects: React.FC<ProjectsProps> = ({projects}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [projectsTitle] = useTranslation('Projects');
  useEffect(() => {
    initialOffsetTop = titleRef.current!.offsetTop;
    const paintBackground = () => {
      // console.log(containerRef.current!.offsetTop);
      // console.log(titleRef.current!.offsetTop);
      if (titleRef.current!.offsetTop > initialOffsetTop) {
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
    <div>
      <h2 ref={titleRef}>{projectsTitle}</h2>
      {projects.map(p => (
        <ProjectItem project={p} key={p.title} />
      ))}
    </div>
  );
};

export default Projects;

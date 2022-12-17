import ProjectItem from './ProjectItem';
import styles from './Projects.module.css';
import {IProject} from 'IPortfolio';

type ProjectSectionProps = {
  projects?: IProject[];
};

const Projects: React.FC<ProjectSectionProps> = ({projects}) => {
  if (!projects) return null;
  return (
    <section className={styles.projectsSection}>
      <h2>Projects I&apos;ve worked on</h2>
      <div className={styles.projects}>
        {projects.map(p => (
          <ProjectItem project={p} key={p.id} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

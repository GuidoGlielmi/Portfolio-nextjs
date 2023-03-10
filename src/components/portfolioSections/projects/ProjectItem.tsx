import styles from './ProjectItem.module.css';
import {IProject} from 'IPortfolio';

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  project: {techs: projectTechs, urls, title, description, projectImg, deployUrl},
}) => {
  return (
    <div>
      <div className={styles.projectImgContainer}>
        <img src={projectImg} alt={`${title} logo`} />
      </div>
      <div className={styles.projectInfoContainer}>
        <h3>{title}</h3>
        <p>{description}</p>
        {deployUrl && (
          <a href={deployUrl} target='_blank' rel='noreferrer'>
            {title} live app
          </a>
        )}
        <div className={styles.urls}>
          {urls.map((u, i) => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.id + i}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={styles.techs}>
          {projectTechs.map((t, i) =>
            i !== projectTechs.length - 1 ? <span key={t.id + i}>{t.name} - </span> : <span key={t.id}>{t.name}</span>,
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

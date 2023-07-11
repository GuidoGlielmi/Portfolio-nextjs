import S from './ProjectItem.module.css';
import {IProject} from 'IPortfolio';

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  project: {techs: projectTechs, urls, title, description, image, deployUrl},
}) => {
  return (
    <div className={S.projectContainer}>
      <div className={S.projectImgContainer}>
        <img src={image} alt={`${title} logo`} />
      </div>
      <div className={S.projectInfoContainer}>
        <h3>{title}</h3>
        <p>{description}</p>
        {deployUrl && (
          <a href={deployUrl} target='_blank' rel='noreferrer'>
            {title} live app
          </a>
        )}
        <div className={S.urls}>
          {urls.map(u => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.url}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={S.techs}>
          {projectTechs.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

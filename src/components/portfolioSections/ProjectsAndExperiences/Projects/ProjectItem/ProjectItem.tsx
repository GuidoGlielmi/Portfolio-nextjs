import useTranslation from 'hooks/useTranslation';
import {PreviewSwitcher} from '../../PreviewSwitcher';
import S from './ProjectItem.module.css';

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem: React.FC<ProjectItemProps> = ({project}) => {
  const [certificateTranslation] = useTranslation('Certificate');

  return (
    <div className={S.projectContainer}>
      <figure style={{position: 'relative'}} className={S.projectImgContainer}>
        {project.deployVideo ? (
          <PreviewSwitcher
            title={project.title}
            image={project.image}
            deployVideo={project.deployVideo}
          />
        ) : (
          <img src={`./assets/logos/${project.image}`} alt={`${project.title} logo`} />
        )}
      </figure>
      <div className={S.info}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.deployUrl && (
          <a href={project.deployUrl} target='_blank' rel='noreferrer'>
            Live app
          </a>
        )}
        {project.certificate && (
          <a
            href={`assets/img/certificates/${project.certificate}`}
            target='_blank'
            rel='noreferrer'
          >
            {certificateTranslation}
          </a>
        )}
        <div className={S.urls}>
          {project.urls.map(u => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.url}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={S.techs}>
          {project.techs.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

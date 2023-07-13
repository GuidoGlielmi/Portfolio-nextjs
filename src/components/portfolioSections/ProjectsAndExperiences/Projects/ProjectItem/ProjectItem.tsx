import S from './ProjectItem.module.css';
import {IProject} from 'IPortfolio';
import {PreviewSwitcher} from '../../Experiences/ExperienceItem/ExperienceItem';
import useTranslation from 'hooks/useTranslation';
type ProjectItemProps = {
  project: IProject;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  project: {
    techs: projectTechs,
    urls,
    title,
    description,
    image,
    deployUrl,
    deployVideo,
    certificate,
  },
}) => {
  const [certificateTranslation] = useTranslation('Certificate');

  return (
    <div className={S.projectContainer}>
      <figure style={{position: 'relative'}} className={S.projectImgContainer}>
        {deployVideo ? (
          <PreviewSwitcher title={title} image={image} deployVideo={deployVideo} />
        ) : (
          <img src={image} alt={`${title} logo`} />
        )}
      </figure>
      <div className={S.info}>
        <h3>{title}</h3>
        <p>{description}</p>
        {deployUrl && (
          <a href={deployUrl} target='_blank' rel='noreferrer'>
            Live app
          </a>
        )}
        {certificate && (
          <a href={`assets/img/certificates/${certificate}`} target='_blank' rel='noreferrer'>
            {certificateTranslation}
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

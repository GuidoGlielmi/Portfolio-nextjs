import useTranslation from 'hooks/useTranslation';
import {PreviewSwitcher} from '../../PreviewSwitcher';
import S from './ExperienceItem.module.css';

type ExperienceItemProps = {
  experience: IExperience;
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({experience}) => {
  const [endDate, certificate] = useTranslation([experience.endDate as 'Current', 'Certificate']);

  return (
    <div className={S.experienceContainer}>
      <figure style={{position: 'relative'}} className={S.experienceImgContainer}>
        {experience.deployVideo ? (
          <PreviewSwitcher
            title={experience.title}
            image={experience.image}
            deployVideo={experience.deployVideo}
          />
        ) : (
          <img src={`./assets/logos/${experience.image}`} alt={`${experience.title} logo`} />
        )}
      </figure>
      <div className={S.info}>
        <h3>{experience.title}</h3>
        <span>
          {experience.startDate} - {endDate}
        </span>
        <p>{experience.description}</p>
        {experience.deployUrl && (
          <div className={S.urls}>
            <a href={experience.deployUrl} target='_blank' rel='noreferrer'>
              Live App
            </a>
          </div>
        )}
        {experience.certificate && (
          <a
            href={`assets/img/certificates/${experience.certificate}`}
            target='_blank'
            rel='noreferrer'
          >
            {certificate}
          </a>
        )}
        <div className={S.urls}>
          {experience.urls.map(u => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.name}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={S.techs}>
          {experience.techs?.map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;

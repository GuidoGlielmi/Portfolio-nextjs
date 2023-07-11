import S from './ExperienceItem.module.css';
import {IExperience} from 'IPortfolio';

type ExperienceItemProps = {
  experience: IExperience;
};

const ExperienceItem: React.FC<ExperienceItemProps> = ({experience}) => {
  return (
    <div className={S.experienceContainer}>
      <div className={S.experienceImgContainer}>
        <img src={experience.image} alt={`${experience.title} logo`} />
      </div>
      <div className={S.experienceInfo}>
        <h3>{experience.title}</h3>
        <span>
          {experience.startDate} - {experience.endDate}
        </span>
        <p>{experience.description}</p>
        {experience.certificate && (
          <a href={experience.certificate} target='_blank' rel='noreferrer'>
            Certificate
          </a>
        )}
        <div className={S.urls}>
          {experience.urls.map((u, i) => (
            <a href={u.url} target='_blank' rel='noreferrer' key={u.name + i}>
              {`${u.name} Repo`}
            </a>
          ))}
        </div>
        <div className={S.techs}>
          {experience.techs?.map((t, i) => (
            <span key={t + i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExperienceItem;

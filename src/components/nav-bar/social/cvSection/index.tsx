import {useState} from 'react';
import S from './CvSection.module.css';

const CvSection = () => {
  const [cvHovered, setCvHovered] = useState(false);

  return (
    <div className={S.cvSection} onMouseEnter={() => setCvHovered(true)}>
      <h3>CV</h3>
      <div
        style={{pointerEvents: cvHovered ? 'all' : 'none'}}
        onMouseLeave={() => setCvHovered(false)}
      >
        <a href='assets/Guido-Glielmi-RESUME.pdf' download>
          EN
        </a>
        <a href='assets/Guido-Glielmi-RESUME(es).pdf' download>
          ES
        </a>
      </div>
    </div>
  );
};

export default CvSection;

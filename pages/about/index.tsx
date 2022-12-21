import S from './styles.module.css';
const About: React.FC = () => {
  return (
    <div className={S.background}>
      <div>
        <div className={S.backgroundYellow} />
      </div>
      <div>
        <div className={S.backgroundRed} />
      </div>
      <div>
        <div className={S.backgroundBlue} />
      </div>
    </div>
  );
};

export default About;

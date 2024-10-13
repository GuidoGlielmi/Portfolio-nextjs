import LoadingIcon from 'components/common/icons/loading-icon/LoadingIcon';
import {AnimatePresence, motion} from 'framer-motion';
import {ReactSVG} from 'react-svg';
import S from './TechGroup.module.css';

type TechsGroupProps = {techs: ITechnology[]};

const TechGroup = ({techs}: TechsGroupProps) => {
  return (
    <div className={S.techGroup}>
      <AnimatePresence mode='wait' initial={false}>
        {techs.map(t => (
          <motion.div
            key={t.name}
            transition={{duration: 0.1}}
            animate={{opacity: 1, scale: 1}}
            initial={{opacity: 0, scale: 0.5}}
            exit={{opacity: 0, scale: 0.5}} // necesary for AnimatePresence
            className={S.tech}
          >
            <ReactSVG src={`assets/logos/${t.image}.svg`} loading={() => <LoadingIcon />} />
            <span>{t.name}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TechGroup;

import Head from 'next/head';
import Link from 'next/link';
import S from './styles.module.css';
import portfolioService from '../services/portfolioService';
import {motion} from 'framer-motion';
import {InferGetStaticPropsType} from 'next';

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({user}) => {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        type: 'spring',
      }}
    >
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500&family=Comfortaa&family=Domine&family=Dosis&family=Josefin+Sans&family=M+PLUS+Rounded+1c&family=Nunito:wght@200;400;500;700&family=Raleway:wght@100;300&family=Source+Serif+Pro:ital,wght@0,300;1,400&family=Spectral&family=Cabin&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Link href='/about'>
        <div className={S.background}>
          <div>
            <div className={S.backgroundBottom} />
          </div>
          <div>
            <div className={S.backgroundRight} />
          </div>
          <div>
            <div className={S.backgroundLeft} />
          </div>
          <div className={S.info}>
            <img src={user?.profileImg} alt='profile' />
            <h1>
              <p>Welcome to my personal page!</p>
              <p> I'm a web developer</p>
            </h1>
            <p>{user?.aboutMe}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default About;

export const getStaticProps = async () => {
  try {
    const users = await portfolioService.getUsers();
    return {
      props: {
        user: users?.[0],
      },
      revalidate: 300,
    };
  } catch (err) {
    console.log(err);
  }
  return {props: {}};
};

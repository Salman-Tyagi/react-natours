import styles from './About.module.css';

const About = ({ tour }) => {
  return (
    <div className={styles.about}>
      <h1>About {tour.name} tour</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, quo,
        et odit distinctio, corrupti ad error esse sed laborum nihil ducimus
        ratione non enim reprehenderit ipsa dolorem eligendi quos magni! Lorem
        ipsum dolor sit amet consectetur adipisicing
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores vero
        sapiente temporibus minus facere? Debitis mollitia voluptate nemo rerum
        accusantium iusto similique, laboriosam placeat sint ipsam tempora odio
        earum. Inventore. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sed, harum nemo
      </p>
    </div>
  );
};

export default About;

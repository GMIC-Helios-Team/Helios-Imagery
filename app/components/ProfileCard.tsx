import style from '@/styles/ProfileCard.module.css';
import { Profile } from '@/types/profile';
import { Card, Container, Image } from 'react-bootstrap';
import { useTheme } from '../contexts/theme-context';

interface ProfileCardProps {
  profile: Profile | null | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Container fluid>
      <div className={`${style.flipCard} ${isDarkTheme ? style.flipped : ''}`}>
        <div className={style.flipCardInner}>
          {/* Front Card */}
          <Card className={style.flipCardFront}>
            <Card.Body className="d-flex flex-column h-100">
              <Card.Title className={style.centeredContent}>{profile?.front.name}</Card.Title>
              <Image
                src={profile?.front.image}
                alt={profile?.front.name}
                fluid
                className={style.imageBeveled}
              />
              <Card.Title className={style.centeredContent}>{profile?.position}</Card.Title>
              <Card.Text className={style.scrollableText}>{profile?.front.bio}</Card.Text>
            </Card.Body>
          </Card>

          {/* Back Card */}
          <Card className={style.flipCardBack}>
            <Card.Body className="d-flex flex-column h-100">
              <Card.Title className={style.centeredContent}>{profile?.back.name}</Card.Title>
              <Image
                src={profile?.back.image}
                alt={profile?.back.name}
                fluid
                className={style.imageBeveled}
              />
              <Card.Title className={style.centeredContent}>{profile?.position}</Card.Title>
              <Card.Text className={style.scrollableText}>{profile?.back.bio}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProfileCard;

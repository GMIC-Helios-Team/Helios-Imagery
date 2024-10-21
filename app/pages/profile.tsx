/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Card, Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { profiles } from '@/helpers/profiles';
import { Profile } from "@/types/profile";


interface ProfileFilterProps {
  selectedTeam: string;
  handleTeamSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface HeliosProfileProps {
  profile: Profile | null | undefined;
  showProfileList: () => void;
}
interface ProfileListProps {
  items: Profile[];
  selectedTeam: string;
  handleTeamSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileSelect: (event: number) => void;
}

const ProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null | undefined>(profiles[0]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("api");
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTeamSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTeam(event.target.value);
  };

  const handleProfileSelect = (eventKey: number) => {
    const profile = profiles.find((p) => p.id === eventKey);
    setSelectedProfile(profile);
    setIsProfileVisible(true);
  };

  const filterProfiles = (profiles: Profile[], team: string): Profile[] => {
    if (team === "all") {
      return profiles;
    }
    return profiles.filter((profile) => profile.team === team);
  }

  const filteredProfiles = filterProfiles(profiles, selectedTeam);
  const showProfileList = () => {
    setIsProfileVisible(false);
  }

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            {isProfileVisible ? (
              <HeliosProfile profile={selectedProfile} showProfileList={showProfileList} />
            ) : (
              <ProfileList items={filteredProfiles} selectedTeam={selectedTeam} handleTeamSelect={handleTeamSelect} handleProfileSelect={handleProfileSelect} />
            )
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;


const ProfileList: React.FC<ProfileListProps> = ({ items, selectedTeam, handleTeamSelect, handleProfileSelect }) => {

  const renderImages = (profiles: Profile[]) => {
    return profiles.map((item) => (
      <Col xs={6} md={4} key={item.id}>
        <Image src={`${item.back.image}`} fluid thumbnail height={150} width={150} onClick={() => handleProfileSelect(item.id)} />
      </Col>
    ));
  };
  return (
    <>
      <Card className={`${".cardBackgroundCustom"} ${".cardShadowCustom"}`}>
        <Card.Header>Profiles</Card.Header>
        <Card.Body>
          <Card.Text>
            <ProfileFilter selectedTeam={selectedTeam} handleTeamSelect={handleTeamSelect} />
          </Card.Text>
          <Row>
            {renderImages(items)}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

const HeliosProfile: React.FC<HeliosProfileProps> = ({ profile, showProfileList }) => (
  <>
    <Card className={`${".cardBackgroundCustom"} ${".cardShadowCustom"}`}>
      <Card.Header>Profiles
        <Button variant="link" onClick={showProfileList} style={{ float: "right" }}>
          Back
        </Button>
      </Card.Header>
      <Card.Body>
        <ProfileCard profile={profile} />
      </Card.Body>
    </Card>
  </>
)

const ProfileFilter: React.FC<ProfileFilterProps> = ({ selectedTeam, handleTeamSelect }) => (
  <Form className="d-flex justify-content-around">
    <Form.Check
      type="radio"
      label="All"
      name="team"
      value="all"
      checked={selectedTeam === "all"}
      onChange={handleTeamSelect}
    />
    <Form.Check
      type="radio"
      label="API"
      name="team"
      value="api"
      checked={selectedTeam === "api"}
      onChange={handleTeamSelect}
    />
    <Form.Check
      type="radio"
      label="Cloud"
      name="team"
      value="cloud"
      checked={selectedTeam === "cloud"}
      onChange={handleTeamSelect}
    />
  </Form>
)
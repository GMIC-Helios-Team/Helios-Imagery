/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Card, Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { profiles } from "@/helpers/profiles";
import { Profile } from "@/types/profile";
import { useTheme } from "@/contexts/theme-context";

interface ProfileFilterProps {
  selectedTeam: string;
  handleTeamSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface HeliosProfileProps {
  profile: Profile | null | undefined;
  showProfileList: () => void;
  isDarkTheme: boolean;
}
interface ProfileListProps {
  items: Profile[];
  selectedTeam: string;
  handleTeamSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileSelect: (event: number) => void;
  isDarkTheme: boolean;
}

const ProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null | undefined>(profiles[0]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("api");
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  const { isDarkTheme } = useTheme();

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
    return profiles.filter((profile) => profile.team === team || profile.team === "");
  };

  const filteredProfiles = filterProfiles(profiles, selectedTeam);

  const showProfileList = () => {
    setIsProfileVisible(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Row className="flex-grow-1 overflow-hidden">
        <Col md={{ offset: 3, span: 6 }} className="d-flex flex-column">
          {isProfileVisible ? (
            <HeliosProfile
              profile={selectedProfile}
              showProfileList={showProfileList}
              isDarkTheme={isDarkTheme}
            />
          ) : (
            <ProfileList
              items={filteredProfiles}
              selectedTeam={selectedTeam}
              handleTeamSelect={handleTeamSelect}
              handleProfileSelect={handleProfileSelect}
              isDarkTheme={isDarkTheme}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;

const ProfileList: React.FC<ProfileListProps> = ({
  items,
  selectedTeam,
  handleTeamSelect,
  handleProfileSelect,
  isDarkTheme,
}) => {
  const renderImages = (profiles: Profile[]) =>
    profiles.map((item) => (
      <Col xs={6} md={4} key={item.id} className="d-flex justify-content-center">
        <Image
          src={isDarkTheme ? item.back.image : item.front.image}
          fluid
          thumbnail
          height={150}
          width={150}
          onClick={() => handleProfileSelect(item.id)}
        />
      </Col>
    ));

  return (
    <Card className={`cardBackgroundCustom cardShadowCustom ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Card.Header>Profiles</Card.Header>
      <Card.Body className="card-body-custom">
        <Card.Text>
          <ProfileFilter selectedTeam={selectedTeam} handleTeamSelect={handleTeamSelect} />
        </Card.Text>
        <div className="scrollable-content">
          <Row className="justify-content-center">{renderImages(items)}</Row>
        </div>
      </Card.Body>
    </Card>
  );
};

const HeliosProfile: React.FC<HeliosProfileProps> = ({ profile, showProfileList, isDarkTheme }) => (
  <Card className={`cardBackgroundCustom cardShadowCustom ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
    <Card.Header>
      Profiles
      <Button variant="link" onClick={showProfileList} style={{ float: "right" }}>
        Back
      </Button>
    </Card.Header>
    <Card.Body>
      <ProfileCard profile={profile} />
    </Card.Body>
  </Card>
);

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
    <Form.Check
      type="radio"
      label="SRE"
      name="team"
      value="sre"
      checked={selectedTeam === "sre"}
      onChange={handleTeamSelect}
    />
  </Form>
);

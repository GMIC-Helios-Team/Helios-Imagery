import React, { useState, useEffect} from "react";
import ProfileCard from "@/components/ProfileCard";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import style from '@/styles/profile.module.css';
import { profiles } from '@/helpers/profiles';
import { Profile } from "@/types/profile";
import { CustomMenu, CustomToggle } from "@/components/custom-dropdown";

const ProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null | undefined>(profiles[0]);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelect = (eventKey: number) => {
    const profile = profiles.find((p) => p.id === eventKey);
    setSelectedProfile(profile);
  };

  const mapProfilesToDropdownItems = (profiles: Profile[]) => {
    return profiles.map((profile) => (
      <Dropdown.Item key={profile.id} eventKey={profile.id} onClick={() => handleSelect(profile.id)}>
        {profile.display}
      </Dropdown.Item>
    ));
  };

  if (!isClient) {
    return null; 
  }

  return (
    <>
      {/* <pre>Profile: {selectedProfile? JSON.stringify(selectedProfile): null }</pre> */}
      <Container style={{ marginTop: '50px' }}>
        <Row className="mb-4">
          <Col md={{ offset: 3, span: 6 }}>
            <Card className={`${style.cardBackgroundCustom} ${style.cardShadowCustom}`}>
              <Card.Header>
                Profile
                <Dropdown style={{ float: "right" }}>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Profiles&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    {mapProfilesToDropdownItems(profiles)}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ProfileCard profile={selectedProfile} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;


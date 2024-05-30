import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Link,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Email, Phone, Facebook, Twitter, Instagram, ExpandMore } from "@mui/icons-material";

const AboutUs = () => {
  return (
    <Container maxWidth='lg' sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant='h3' gutterBottom>
          About Us
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Mission Statement
        </Typography>
        <Typography variant='body1' paragraph>
          Our mission is to create a platform where people can easily find blood donors and save
          lives. We believe in the power of community and the importance of helping others in need.
          Our goal is to ensure that no one has to struggle to find a blood donor in times of
          emergency.
        </Typography>
        <Typography variant='body1' paragraph>
          We are committed to promoting blood donation awareness and educating people about the
          importance of donating blood. Our platform aims to bridge the gap between donors and
          recipients, making the process seamless and efficient.
        </Typography>
      </Box>

      {/* Team Information */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Team Information
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              name: "John Doe",
              title: "Founder & CEO",
              description:
                "John is passionate about helping others and has a vision to connect blood donors with those in need.",
            },
            {
              name: "Jane Smith",
              title: "CTO",
              description:
                "Jane is a tech enthusiast who believes in using technology for social good. She leads our tech team to build and maintain the platform.",
            },
            {
              name: "Mike Johnson",
              title: "COO",
              description:
                "Mike oversees the operations and ensures everything runs smoothly. He is dedicated to making our services accessible to everyone.",
            },
            {
              name: "Emily Davis",
              title: "Head of Marketing",
              description:
                "Emily is responsible for spreading the word about our mission and reaching as many potential donors and recipients as possible.",
            },
            {
              name: "David Brown",
              title: "Lead Developer",
              description:
                "David leads the development team and ensures that our platform is robust and user-friendly.",
            },
            {
              name: "Sarah Wilson",
              title: "Community Manager",
              description:
                "Sarah engages with our community, listens to their feedback, and helps us improve our services.",
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant='h6'>{member.name}</Typography>
                  <Typography variant='body2'>{member.title}</Typography>
                  <Typography variant='body2'>{member.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* History */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Our History
        </Typography>
        <Typography variant='body1' paragraph>
          Founded in 2020, our organization started as a small group of volunteers who wanted to
          make a difference in the community. Over the years, we have grown into a comprehensive
          platform that connects thousands of donors with recipients. Our journey has been fueled by
          the dedication of our team and the generosity of our donors.
        </Typography>
        <Typography variant='body1' paragraph>
          We have organized numerous blood drives, awareness campaigns, and community events to
          promote the importance of blood donation. Our efforts have been recognized by various
          health organizations and community groups, and we continue to strive for excellence in our
          mission.
        </Typography>
      </Box>

      {/* Testimonials */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Testimonials
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              name: "Alice M.",
              testimonial:
                "This platform helped me find a blood donor when my father needed a transfusion urgently. I am forever grateful!",
            },
            {
              name: "Robert K.",
              testimonial:
                "Donating blood through this website was a smooth process. I appreciate the efforts of the team behind this initiative.",
            },
            {
              name: "Sophie L.",
              testimonial:
                "The community support here is amazing. I found a donor within hours, and it saved my sister's life.",
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant='body2' paragraph>
                    &quot;{testimonial.testimonial}&quot;
                  </Typography>
                  <Typography variant='subtitle2' align='right'>
                    - {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Frequently Asked Questions
        </Typography>
        {[
          {
            question: "How can I become a blood donor?",
            answer:
              "To become a blood donor, simply sign up on our platform, complete your profile, and indicate your availability for donation.",
          },
          {
            question: "Is it safe to donate blood during the COVID-19 pandemic?",
            answer:
              "Yes, it is safe to donate blood during the COVID-19 pandemic. We follow strict health and safety protocols to ensure the safety of donors and recipients.",
          },
          {
            question: "How often can I donate blood?",
            answer:
              "You can donate whole blood every 56 days. For other types of donations like platelets or plasma, the frequency may vary.",
          },
        ].map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Contact Information */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5' gutterBottom>
          Contact Information
        </Typography>
        <Typography variant='body1' paragraph>
          If you have any questions or need assistance, feel free to reach out to us:
        </Typography>
        <Typography variant='body2'>
          <Email sx={{ verticalAlign: "middle", marginRight: 1 }} /> info@blooddonation.com
        </Typography>
        <Typography variant='body2'>
          <Phone sx={{ verticalAlign: "middle", marginRight: 1 }} /> +123-456-7890
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Link href='https://www.facebook.com' target='_blank' sx={{ marginRight: 1 }}>
            <IconButton aria-label='facebook'>
              <Facebook />
            </IconButton>
          </Link>
          <Link href='https://www.twitter.com' target='_blank' sx={{ marginRight: 1 }}>
            <IconButton aria-label='twitter'>
              <Twitter />
            </IconButton>
          </Link>
          <Link href='https://www.instagram.com' target='_blank'>
            <IconButton aria-label='instagram'>
              <Instagram />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;

"use client";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const testimonialsData = [
  {
    id: "4d1da3b2-02a9-4f15-9c17-b57c8110d358",
    name: "Masum 6",
    email: "masum6@gmail.com",
    bloodType: "O_NEGATIVE",
    location: "Natore",
    message: "I am forever grateful for the blood donation I received. It saved my life.",
  },
  {
    id: "9cd0d0aa-6984-4dee-8023-69bf8d62c220",
    name: "Masum 5",
    email: "masum5@gmail.com",
    bloodType: "A_NEGATIVE",
    location: "Natore",
    message: "The donation process was seamless and the support was incredible.",
  },
  {
    id: "4679e07a-2e44-4e7e-b601-942d5c55e79b",
    name: "User",
    email: "user@gmail.com",
    bloodType: "B_POSITIVE",
    location: "Dhaka",
    message: "Thank you for the timely donation. It was crucial for my treatment.",
  },
  {
    id: "193fec11-976f-4e77-851c-893721d78b3b",
    name: "Raihan",
    email: "raihan@gmail.com",
    bloodType: "B_POSITIVE",
    location: "Dhaka",
    message: "Your blood donation saved my life. Thank you so much!",
  },
];

const Testimonials = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "100%", padding: { xs: "10px", md: "20px" }, backgroundColor: "#f5f5f5" }}>
      <Typography variant='h4' align='center' gutterBottom>
        Testimonials
      </Typography>
      <Slider {...settings}>
        {testimonialsData.map((testimonial) => (
          <Box key={testimonial.id} sx={{ padding: "0 10px" }}>
            <Card sx={{ margin: "0 auto", maxWidth: 600, borderRadius: "15px", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                  <Avatar
                    sx={{
                      marginRight: "15px",
                      width: 56,
                      height: 56,
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {testimonial.location}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body1' sx={{ fontStyle: "italic", marginBottom: "15px" }}>
                  &quot;{testimonial.message}&quot;
                </Typography>
                <Typography variant='body2' color='textSecondary' sx={{ marginBottom: "5px" }}>
                  Blood Type: <strong>{testimonial.bloodType}</strong>
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Email: <strong>{testimonial.email}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;

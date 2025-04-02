"use client";

import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, Alert, Divider } from "@mui/material";
import { Google, Facebook, Apple } from "@mui/icons-material";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (email === "test@example.com" && password === "password123") {
            alert("Login Successful!");
            localStorage.setItem("user", email);
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <Box sx={{ position: "relative", height: "100vh" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.44), rgba(0,0,0,0.64)), url('/bg-img.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: -1,
                }}
            />

            <Grid container sx={{ height: "100vh" }}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: '200px',
                        paddingRight: '560px',
                    }}
                >
                    <Box>
                        <img src="/logo_highbridge.svg" alt="HighBridge Logo" width="273px" height="60px" />

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{
                                textAlign: "left",
                                mt: 4,
                            }}
                        >
                            Building the Future...
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: "left", // Left-align text
                                maxWidth: "380px", // Match Figma layout
                                mt: 1,
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Section with Login Form */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative", // Ensure relative positioning
                        height: "100vh", // Full screen height
                    }}
                >

                <Paper
                        elevation={6}
                        sx={{
                            width: "90vw",
                            maxWidth: "400px",
                            padding: 4,
                            borderRadius: "24px 24px 0 0", // Rounded top corners only
                            backgroundColor: "#FAFAFA",
                            position: "absolute", // Stick to bottom
                            bottom: 0, // Align at bottom
                            mb: 0, // Remove negative margin
                        }}
                    >

                    <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
                            WELCOME BACK!
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                            Log In to your Account
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                                <Typography variant="body2" sx={{ color: "blue", cursor: "pointer" }}>
                                    Forgot Password?
                                </Typography>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2, bgcolor: "red", color: "white", fontWeight: "bold", borderRadius: 2 }}
                            >
                                Log In
                            </Button>

                            <Divider sx={{ my: 2 }}>Or</Divider>

                            {/* Social Login Buttons */}
                            <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ mb: 1 }}>
                                Log In with Google
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<Facebook />} sx={{ mb: 1 }}>
                                Log In with Facebook
                            </Button>
                            <Button fullWidth variant="outlined" startIcon={<Apple />} sx={{ mb: 2 }}>
                                Log In with Apple
                            </Button>

                            <Typography variant="body2" textAlign="center" mt={2}>
                                New User? <strong style={{ color: "blue", cursor: "pointer" }}>SIGN UP HERE</strong>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;

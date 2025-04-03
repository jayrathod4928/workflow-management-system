"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, Alert, Divider } from "@mui/material";
import { GoogleIcon } from "@/components/Icons/GoogleIcon";
import { FacebookIcon } from "@/components/Icons/FacebookIcon";
import { AppleIcon } from "@/components/Icons/AppleIcon";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("password123");
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
            localStorage.setItem("user", email);
            router.push("/dashboard");
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
                <Box sx={{ display: "flex", gap: '550px' }}>
                    <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: '200px' }}>
                        <Box>
                            <img src="/logo_highbridge.svg" alt="HighBridge Logo" width="273px" height="60px" />

                            <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "left", mt: '119px' }}>
                                Building the Future...
                            </Typography>

                            <Typography variant="body1" sx={{ textAlign: "left", maxWidth: "380px", mt: '24px' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "100vh" }}>
                        <Paper
                            elevation={6}
                            sx={{
                                width: "90vw",
                                maxWidth: "400px",
                                padding: 4,
                                borderRadius: "24px 24px 0 0",
                                backgroundColor: "#FAFAFA",
                                position: "absolute",
                                bottom: 0,
                            }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>WELCOME BACK!</Typography>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Log In to your Account
                            </Typography>

                            {error && <Alert severity="error">{error}</Alert>}

                            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Email</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#BDBDBD" },
                                            "&:hover fieldset": { borderColor: "black" },
                                            "&.Mui-focused fieldset": { borderColor: "black" },
                                            "& input": { color: "black" },
                                        },
                                    }}
                                />

                                <Typography sx={{ fontSize: "14px", fontWeight: "bold", mt: 2 }}>Password</Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#BDBDBD" },
                                            "&:hover fieldset": { borderColor: "black" },
                                            "&.Mui-focused fieldset": { borderColor: "black" },
                                            "& input": { color: "black" },
                                        },
                                    }}
                                />

                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} sx={{ fontSize: '12px' }}>
                                    <FormControlLabel
                                        control={<Checkbox sx={{ '&.Mui-checked': { color: "red" } }} />}
                                        label={<Typography sx={{ fontSize: "12px" }}>Remember me</Typography>}
                                    />
                                    <Typography variant="body2" sx={{ cursor: "pointer", fontSize: "12px" }}>
                                        Forgot Password?
                                    </Typography>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        mb: 2,
                                        bgcolor: "red",
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRadius: 2,
                                        boxShadow: "none",
                                        "&:hover": { bgcolor: "red", boxShadow: "none" }
                                    }}
                                >
                                    Log In
                                </Button>

                            <Divider sx={{ my: 2 }}>Or</Divider>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                                    {[
                                        { icon: (
                                                <Box sx={{ fontSize: "24px" }}>
                                                    <GoogleIcon />
                                                </Box>
                                            ), text: "Log In with Google" },
                                        { icon: (
                                                <Box sx={{ fontSize: "24px" }}>
                                                    <FacebookIcon />
                                                </Box>
                                            ), text: "Log In with Facebook" },
                                        { icon: (
                                                <Box sx={{ fontSize: "24px" }}>
                                                    <AppleIcon />
                                                </Box>
                                            ), text: "Log In with Apple" },

                                    ].map(({ icon, text }, index) => (
                                        <Button
                                            key={index}
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textTransform: "none",
                                                fontSize: "16px",
                                                color: "#616161",
                                                borderColor: "#9E9E9E",
                                                borderWidth: "1.5px",
                                                padding: "12px 16px",
                                                gap: "12px",
                                                borderRadius: "12px",
                                                position: "relative",
                                            }}
                                        >
                                            <Box sx={{ position: "absolute", left: "28px", display: "flex", alignItems: "center" }}>
                                                {icon}
                                            </Box>
                                            {text}
                                        </Button>
                                    ))}
                                </Box>

                                <Typography variant="body2" textAlign="center" mt={2}>
                                    New User?{" "}
                                    <strong style={{ cursor: "pointer", textDecoration: "underline" }}>
                                        SIGN UP HERE
                                    </strong>
                                </Typography>

                            </Box>
                        </Paper>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    );
};

export default LoginPage;

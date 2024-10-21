import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z as zod } from "zod";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import pic from "../../Assests/1.png";

const fileSchema = zod
  .instanceof(File)
  .refine((file) => file.size <= 5000000, "Max file size is 5MB")
  .or(zod.undefined());

export const userFormSchema = zod.object({
  image: fileSchema.or(
    zod.string().refine((val) => !!val, "Image is required!")
  ),
  fullName: zod.string().min(1, { message: "Full Name is required!" }),
  address: zod.string().min(1, { message: "Address is required!" }),
  gender: zod.string().min(1, { message: "Gender is required!" }),
  email: zod
    .string()
    .email("Invalid email format")
    .min(1, { message: "Email is required!" }),
  mobile: zod
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  pincode: zod.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

export const Form = () => {
  const [imagePreview, setImagePreview] = useState(pic); // Initialize with default pic

  const defaultValues = useMemo(
    () => ({
      image: undefined,
      fullName: "raja ji",
      address: "bhopal",
      gender: "Male",
      email: "abc@gmail.com",
      mobile: "0123456789",
      pincode: "436106",
      password: "123456",
    }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const oSubmit = handleSubmit((data) => {
    console.log(data, "userData submit");
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 1,
      }}
    >
      <Typography>User Form With Zod</Typography>
      <Box
        component={"form"}
        onSubmit={oSubmit}
        sx={{
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={imagePreview} // Set preview image
            alt="Profile Picture"
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-button-file"
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleImageChange(e.target.files[0]); // Handle image preview
                  }}
                />
                <label htmlFor="upload-button-file">
                  <Button variant="outlined" component="span">
                    Upload
                  </Button>
                </label>
              </>
            )}
          />
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}
        </Box>

        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Full Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                error={!!errors.gender}
                {...field}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        {errors.gender && (
          <Typography color="error">{errors.gender.message}</Typography>
        )}

        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Address"
              error={!!errors.address}
              helperText={errors.address?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="pincode"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Pincode"
              error={!!errors.pincode}
              helperText={errors.pincode?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

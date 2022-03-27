import "./container.styles.scss";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import validator from "validator";
import { couponCode } from "../../coupon-code/couponcode.array";

console.log(couponCode.offers);
export default function Container() {
  const [name, setName] = useState({ fname: "", lname: "" });
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);

  function fullNameHandler(e) {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
    console.log(name);
  }

  function phoneNumberHandler(e) {
    console.log(e.target.value);
    const check = validator.isMobilePhone(e.target.value, ["en-IN"]);
    check ? setPhoneValidate(true) : setPhoneValidate(false);
  }
  function emailHandler(e) {
    console.log(e.target.value);
    const check = validator.isEmail(e.target.value);
    console.log(check);
    check ? setEmailValidate(true) : setEmailValidate(false);
  }

  return (
    <Box sx={{ background: "lightgrey", borderRadius: "5px", padding: "20px 70px", maxWidth: "600px", margin: "20px" }}>
      <div className="flex-2">
        <TextField
          // sx={{
          //   color: "red",
          //   "& .MuiInputLabel-root": {
          //     color: "purple ",
          //   },
          // }}
          fullWidth
          margin="normal"
          id="filled-basic"
          label="first name"
          variant="filled"
          required
          name="fname"
          value={name.fname}
          onChange={fullNameHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          id="filled-basic"
          label="last name"
          variant="filled"
          name="lname"
          required
          value={name.lname}
          onChange={fullNameHandler}
        />
      </div>
      <TextField
        fullWidth
        margin="normal"
        id="filled-basic"
        label="email"
        type="email"
        variant="filled"
        name="email"
        required
        color={`${emailValidate ? "success" : ""}`}
        onChange={emailHandler}
      />
      <TextField
        fullWidth
        margin="normal"
        id="filled-basic"
        label="phone number"
        variant="filled"
        name="number"
        required
        color={`${phoneValidate ? "success" : ""}`}
        onChange={phoneNumberHandler}
      />
      <TextField
        fullWidth
        margin="normal"
        id="filled-basic"
        label="Coupon Code"
        variant="filled"
        name="coupon"
        type="search"
        helperText="optional"
      />
    </Box>
  );
}

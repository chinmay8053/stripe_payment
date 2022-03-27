import "./container.styles.scss";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from "validator";
import { CouponCodes } from "../../coupon-code/couponcode.array";

export default function Container() {
  const [name, setName] = useState({ fname: "", lname: "", email: "", number: "" });
  const [couponCode, setCouponCode] = useState("");
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [coupon, setCoupon] = useState([]);

  useEffect(() => {
    setCoupon([...CouponCodes.offers.filter((_, i) => i < 5)]);
  }, []);

  function changeHandle(e) {
    const target = e.target.name;

    if (target === "email") {
      const check = validator.isEmail(e.target.value);
      setEmailValidate(check ? true : false);
      setName({ ...name, [target]: e.target.value });
    } else if (target === "number") {
      const check = validator.isMobilePhone(e.target.value, ["en-IN"]);
      setPhoneValidate(check ? true : false);
      setName({ ...name, [target]: e.target.value });
    } else if (target === "coupon") {
      setCouponCode(e.target.value);
    } else {
      setName({ ...name, [target]: e.target.value });
    }
  }

  function couponHandle(e) {
    console.log(coupon.map((cou) => console.log(cou.code)));
  }

  return (
    <Box
      sx={{
        background: "lightgrey",
        borderRadius: "5px",
        padding: "30px 60px",
        maxWidth: "550px",
        boxShadow: "5px 10px 10px rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex-2">
        <TextField
          // sx={{ color: "red", "& .MuiInputLabel-root": { color: "purple " } }}
          fullWidth
          margin="normal"
          id="filled-basic"
          label="first name"
          variant="filled"
          required
          name="fname"
          value={name.fname}
          onChange={changeHandle}
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
          onChange={changeHandle}
        />
      </div>
      <TextField
        // sx={{
        //   backgroundColor: `${emailValidate ? "rgba(0,255,9,0.1)" : ""}`,
        // }}
        fullWidth
        margin="normal"
        id="filled-basic"
        label="email"
        type="email"
        variant="filled"
        name="email"
        required
        value={name.email}
        color={`${emailValidate ? "success" : ""}`}
        onChange={changeHandle}
      />
      <TextField
        // sx={{
        //   backgroundColor: `${phoneValidate ? "rgba(0,255,9,0.05)" : ""}`,
        // }}
        fullWidth
        margin="normal"
        id="filled-basic"
        label="phone number"
        variant="filled"
        name="number"
        required
        value={name.number}
        color={`${phoneValidate ? "success" : ""}`}
        onChange={changeHandle}
      />
      <div className="flex-2">
        <TextField
          fullWidth
          margin="normal"
          id="filled-basic"
          label="Coupon Code"
          variant="filled"
          name="coupon"
          type="search"
          helperText="optional"
          value={couponCode}
          onChange={changeHandle}
        />
        <Button
          sx={{
            height: "56px",
            marginBottom: "12px",
            padding: "0 40px",
            marginLeft: "5px",
            backgroundColor: "rgba(0,0,1,0.7)",
            "&:hover": {
              backgroundColor: "rgba(0,0,1,0.8)",
            },
          }}
          variant="contained"
          onClick={couponHandle}
        >
          APPLY
        </Button>
      </div>
    </Box>
  );
}

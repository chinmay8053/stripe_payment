import "./container.styles.scss";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from "validator";
import { CouponCodes } from "../../coupon-code/couponcode.array";
import CardPayment from "../Card/cardpayment.component";

export default function Container() {
  const [name, setName] = useState({ fname: "", lname: "", email: "", number: "" });
  const [couponCode, setCouponCode] = useState("");
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [offerValidate, setOfferValidate] = useState({ offerValue: 0, offerState: false });
  const [coupons, setCoupons] = useState([]);
  const [totalAmt, setTotalAmt] = useState(500);

  useEffect(() => {
    setCoupons([...CouponCodes.offers.filter((_, i) => i < 5)]);
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
    const check = coupons.filter((coupon) => couponCode === coupon.code);
    setOfferValidate({ ...offerValidate, offerState: false });
    if (check.length === 0) return;
    const discount = +check[0].offervalue.slice(0, -1);
    setOfferValidate({ offerValue: discount, offerState: true });
    setTotalAmt(totalAmt * (1 - discount / 100));
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
          fullWidth
          margin="dense"
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
          margin="dense"
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
        fullWidth
        margin="dense"
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
        fullWidth
        margin="dense"
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
          margin="dense"
          id="filled-basic"
          label="Coupon Code"
          variant="filled"
          name="coupon"
          type="search"
          helperText="optional"
          color={`${offerValidate.offerState ? "success" : ""}`}
          value={couponCode}
          onChange={changeHandle}
        />
        <Button
          sx={{
            height: "56px",
            marginBottom: "16px",
            padding: "0 40px",
            marginLeft: "5px",
            border: "1px solid black",
            color: "rgba(0,0,1,0.7)",
            "&:hover": {
              border: "1px solid black",
              color: "rgba(0,0,1,0.8)",
            },
          }}
          variant="outlined"
          onClick={couponHandle}
        >
          APPLY
        </Button>
      </div>
      {offerValidate.offerState ? <p className="offer">you got {offerValidate.offerValue}% off</p> : ""}

      <CardPayment offer={totalAmt} />
    </Box>
  );
}

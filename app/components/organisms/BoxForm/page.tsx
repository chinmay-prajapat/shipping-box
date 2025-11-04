"use client";

import Button from "@/app/components/atoms/Button/page";
import ColorPicker from "@/app/components/atoms/ColorPicker/page";
import Input from "@/app/components/atoms/Input/page";
import Select from "@/app/components/atoms/Select/page";
import { MAX_WEIGHT_KG } from "@/app/constants/validation";
import { container } from "@/data/Container";
import { DestinationCountry } from "@/data/domain/enums/DestinationCountry";
import { SHIPPING_COST_MAPPING } from "@/data/domain/mappings/ShippingCostMapping";
import { BoxTransformer } from "@/data/transformers/BoxTransformer";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import styles from "./style.module.css";

type FormErrors = Partial<{
  receiverName: string;
  weight: string;
  boxColor: string;
  destinationCountry: string;
  submit: string;
}>;

export default function BoxForm() {
  const router = useRouter();
  const [receiverName, setReceiverName] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [boxColor, setBoxColor] = useState("");
  const [boxColorHex, setBoxColorHex] = useState("#000000");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const countryOptions = useMemo(
    () =>
      Object.values(SHIPPING_COST_MAPPING).map((shippingCost) => ({
        value: shippingCost.country,
        label: `${shippingCost.country} (${BoxTransformer.formatCurrency(
          shippingCost.costPerBox
        )})`,
      })),
    []
  );

  const validateWeight = (
    weightValue: number | ""
  ): { error: string | undefined; normalizedWeight: number | "" } => {
    if (
      weightValue === "" ||
      weightValue === null ||
      weightValue === undefined
    ) {
      return { error: "Weight is required", normalizedWeight: "" };
    }

    if (typeof weightValue === "number") {
      if (weightValue < 0) {
        return {
          error: "Weight cannot be negative. Defaulting to 0.",
          normalizedWeight: 0,
        };
      } else if (weightValue === 0) {
        return {
          error: "Weight must be greater than 0",
          normalizedWeight: 0,
        };
      } else if (weightValue > MAX_WEIGHT_KG) {
        return {
          error: `Weight cannot exceed ${MAX_WEIGHT_KG} kg.`,
          normalizedWeight: weightValue,
        };
      }
    }

    return { error: undefined, normalizedWeight: weightValue };
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!receiverName.trim()) {
      newErrors.receiverName = "Receiver name is required";
    }

    const weightValidation = validateWeight(weight);
    if (weightValidation.error) {
      newErrors.weight = weightValidation.error;
      if (weightValidation.normalizedWeight !== weight) {
        setWeight(weightValidation.normalizedWeight);
      }
    }

    if (!boxColor.trim()) {
      newErrors.boxColor = "Box color is required";
    } else {
      // Validate RGB format
      const rgbPattern = /^\s*\d+\s*,\s*\d+\s*,\s*\d+\s*$/;
      if (!rgbPattern.test(boxColor)) {
        newErrors.boxColor =
          "Please enter a valid RGB format (e.g., 255, 255, 255)";
      }
    }

    if (!destinationCountry) {
      newErrors.destinationCountry = "Destination country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setWeight("");
      setErrors((prev) => ({ ...prev, weight: undefined }));
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const weightValidation = validateWeight(numValue);
      setWeight(weightValidation.normalizedWeight);
      setErrors((prev) => ({
        ...prev,
        weight: weightValidation.error,
      }));
    }
  };

  const handleColorChange = (rgb: string, hex: string) => {
    setBoxColor(rgb);
    setBoxColorHex(hex);
    setErrors((prev) => ({ ...prev, boxColor: undefined }));
  };

  const handleRgbChange = (rgb: string) => {
    handleColorChange(rgb, BoxTransformer.fromRgb(rgb));
  };

  const handleHexChange = (hex: string) => {
    handleColorChange(BoxTransformer.toRgb(hex), hex);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const addBoxUseCase = container.getAddBoxUseCase();
      await addBoxUseCase.execute({
        receiverName: receiverName.trim(),
        weight: typeof weight === "number" ? weight : 0,
        boxColor: BoxTransformer.toRgb(boxColor),
        destinationCountry: destinationCountry as DestinationCountry,
      });

      setReceiverName("");
      setWeight("");
      setBoxColor("");
      setBoxColorHex("#000000");
      setDestinationCountry("");
      setErrors({});
      setSubmitSuccess(true);

      router.push("/boxes");
    } catch (error) {
      console.error("Error saving box:", error);
      setErrors({
        ...errors,
        submit: "Failed to save box. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Add New Box</h2>

      <Input
        id="receiverName"
        label="Receiver Name"
        type="text"
        placeholder="Enter receiver name"
        value={receiverName}
        onChange={(e) => {
          setReceiverName(e.target.value);
          setErrors((prev) => ({ ...prev, receiverName: undefined }));
        }}
        error={errors.receiverName}
        required
      />

      <Input
        id="weight"
        label={`Weight (kg) - Max ${MAX_WEIGHT_KG} kg`}
        type="number"
        step="0.01"
        min="0"
        max={MAX_WEIGHT_KG}
        placeholder="0.00"
        value={weight}
        onChange={handleWeightChange}
        error={errors.weight}
        required
      />

      <ColorPicker
        id="boxColor"
        label="Box Colour"
        value={boxColor}
        hexValue={boxColorHex}
        onRgbChange={handleRgbChange}
        onHexChange={handleHexChange}
        error={errors.boxColor}
        required
      />

      <Select
        id="destinationCountry"
        label="Destination Country"
        options={countryOptions}
        value={destinationCountry}
        onChange={(e) => {
          setDestinationCountry(e.target.value);
          setErrors((prev) => ({ ...prev, destinationCountry: undefined }));
        }}
        error={errors.destinationCountry}
        required
      />

      {errors.submit && (
        <div className={styles.submitError}>{errors.submit}</div>
      )}

      {submitSuccess && (
        <div className={styles.submitSuccess}>Box saved successfully!</div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

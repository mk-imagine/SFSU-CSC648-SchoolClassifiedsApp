import React from "react";
import { Row, Col } from "react-bootstrap";
import { ItemTopCategoryCard } from "../ItemCard";
import bookImage from "../../images/bookCategoryTitle.jpg";
import electronicImage from "../../images/electronicsCategoryTitle.jpg";
import furnitureImage from "../../images/furnitureCategoryTitle.jpg";
import apparalImage from "../../images/apparalCategoryTitle.jpg";

/**
 * Loads top categories for browsing
 * @returns HTML that shows a list of top categories
 */
const TopCategoryItems = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Row>
        <Col>
          <ItemTopCategoryCard title="Books" image={bookImage} />
        </Col>
        <Col>
          <ItemTopCategoryCard title="Electronics" image={electronicImage} />
        </Col>
        <Col>
          <ItemTopCategoryCard title="Furniture" image={furnitureImage} />
        </Col>
        <Col>
          <ItemTopCategoryCard title="Apparal" image={apparalImage} />
        </Col>
      </Row>
    </div>
  );
};

export default TopCategoryItems;

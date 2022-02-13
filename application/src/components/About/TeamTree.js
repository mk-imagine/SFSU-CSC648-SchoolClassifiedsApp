import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: "#fff";
`;

const TeamTree = () => {
  let navigate = useNavigate();
  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={
        <StyledNode
          style={{ background: "#ee5253", color: "#fff" }}
          onClick={() => {
            navigate("/about/Mark");
          }}
        >
          <h6>Team Lead</h6>
          <div style={{ color: "#fff" }}>Mark Kim</div>
        </StyledNode>
      }
    >
      <TreeNode
        label={
          <StyledNode
            style={{ background: "#341f97", color: "#fff" }}
            onClick={() => {
              navigate("/about/Khushboo");
            }}
          >
            <h6>Front End Lead</h6>
            Khushboo Gandhi
          </StyledNode>
        }
      >
        <TreeNode
          label={
            <StyledNode>
              <StyledNode
                style={{ background: "#10ac84", color: "#fff" }}
                onClick={() => {
                  navigate("/about/Jiasheg");
                }}
              >
                Jiasheng Li
              </StyledNode>
            </StyledNode>
          }
        />
      </TreeNode>
      <TreeNode
        label={
          <StyledNode>
            <StyledNode
              style={{ background: "#341f97", color: "#fff" }}
              onClick={() => {
                navigate("/about/Cody");
              }}
            >
              <h6>Back End Lead</h6>
              Cody Huang
            </StyledNode>
          </StyledNode>
        }
      >
        <TreeNode
          label={
            <StyledNode
              style={{ background: "#10ac84", color: "#fff" }}
              onClick={() => {
                navigate("/about/Vivian");
              }}
            >
              Vivian Kuang
            </StyledNode>
          }
        ></TreeNode>
        <TreeNode
          label={
            <StyledNode
              style={{ background: "#10ac84", color: "#fff" }}
              onClick={() => {
                navigate("/about/Jesus");
              }}
            >
              Jesus Cervantes
            </StyledNode>
          }
        ></TreeNode>
      </TreeNode>
      <TreeNode
        label={
          <StyledNode>
            <StyledNode
              style={{ background: "#341f97", color: "#fff" }}
              onClick={() => {
                navigate("/about/Ernesto");
              }}
            >
              <h6>GitHub Lead</h6>
              Ernesto Diaz
            </StyledNode>
          </StyledNode>
        }
      ></TreeNode>
    </Tree>
  );
};

export default TeamTree;

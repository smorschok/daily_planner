import React from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import { PaginateProps } from "../interface";
export const Paginate: React.FC<PaginateProps> = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
  pageSize,
  paginatePrev,
  paginateNext,
}) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-2">
      <div>Total users : {totalPosts}</div>
      <Form className=" d-flex ">
        <Form.Group
          as={Row}
          className="justify-content-center align-items-center"
          controlId="exampleForm.SelectCustom"
        >
          <Form.Label column>Page size</Form.Label>
          <Col>
            <Form.Control
              size="sm"
              value={postsPerPage}
              onChange={pageSize}
              as="select"
              custom
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={totalPosts}>All users</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center align-items-center">
        <Pagination className="m-1 container d-flex flex-wrap justify-content-center">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={paginatePrev}
          />

          {pageNumbers.map((number) => (
            <Pagination.Item
              active={currentPage === number}
              key={number}
              onClick={(e) => paginate(e, number)}
            >
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === pageNumbers.length}
            onClick={() => paginateNext(pageNumbers)}
          />
        </Pagination>
      </div>
    </div>
  );
};

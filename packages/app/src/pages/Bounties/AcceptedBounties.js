import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounties, bountiesSelector } from "../../store/reducers/explorerSlice";
import EmptyBounty from "@pages/Bounties/EmptyBounty";
import styled from "styled-components";
import Container from "@components/Container";
import BountyList from "../../components/BountyList";

import Pagination from "@components/Pagination";

const Wrapper = styled(Container)`
  & > main {
  }
  margin-top: 26px;
`

export default function AcceptedBounties() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBounties({ state: 'Accepted' }, tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(bountiesSelector)
  const tablePageTotal = Math.ceil(total / pageSize);

  if (bounties.length <= 0) {
    return <EmptyBounty />
  }

  return (
    <Wrapper>
      <BountyList bounties={bounties} />
      <Pagination
        boundaryRange={0}
        defaultActivePage={page || 1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={tablePageTotal}
        onPageChange={(_, data) => {
          setTablePage(data.activePage);
          setTablePageSize(pageSize)
        }}
      />
    </Wrapper>
  )
}

import styled from "styled-components"

export default function PageSectionTitle(props: {title:string}) {
    return (
        <SectionTitle>{props.title.toUpperCase()}</SectionTitle>
    )
}

const SectionTitle = styled.h2`
    color: #BBE1FA;
    font-weight: 700;
    font-size: 1.5rem;
`
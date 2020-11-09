import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import gfm from 'remark-gfm'

const Markdown = ({ className, isPreview = false, md }) => {
  return <ReactMarkdown
    plugins={[gfm]}
    className={isPreview ? `${className} mde-preview-content` : className} source={md}
                        linkTarget='_blank' />;
};

export default styled(Markdown)`
	&, &.mde-preview-content {
		font-size: 14px;
		line-height: 24px;
		margin-bottom: 2rem;
		color: rgba(29, 37, 60, 0.64);
		overflow-wrap: break-word;

		p, blockquote, ul, ol, dl, table {
			line-height: 150%;
			margin: 0 0 15px 0;
		}

		h1 {
			font-size: 30px;
			margin-bottom: 30px;
		}

		h2 {
			font-size: 24px;
			margin: 30px 0 20px 0;
		}

		h3, h4 {
			font-size: 18px;
			margin-bottom: 8px;
		}

		ul, ol {
			padding-left: 20px;

			li > input {
				display: none;
			}
		}

		a {
			color: ${p => p.primaryColor || '#04D2C5'};

			&:hover {
				text-decoration: none;
				color: ${p => p.primaryColor || '#04D2C5'};
			}
		}

		blockquote {
			margin-left: 0;
			padding: 0 1em;
			color: #777B80;
			border-left-style: solid;
			border-left-width: 0.25rem;
			border-left-color: #777B80;
			font-size: 1.6rem;
				& > :first-child {
					margin-top: 0;
				}
				& > :last-child {
					margin-bottom: 0;
				}
		}

		img {
			max-width: 100%;
			display: block;
			margin: 0 auto;
			
			width: unset !important;
			height: 148px !important;
		}

		pre {
			background-color: #EBF0F5;
			padding: 1.6rem;
			overflow: auto;
			border-radius: 0.3rem;
		}

		code {
			margin: 0;
			font-size: 1.3rem;
			border-radius: 3px;
			color: #53595C;
			white-space: pre;
			&::before, &::after {
				letter-spacing: -0.2em;
			}
		}
	}

	&.mde-preview-content {

		h1, h2, h3, h4 {
			border-bottom: none;
		}

		h1, h2 {
			font-size: 1.8rem;
			font-weight: 400;
		}

		h3, h4 {
			font-size: 1.5rem;
			font-weight: 500;
		}
	}
`;


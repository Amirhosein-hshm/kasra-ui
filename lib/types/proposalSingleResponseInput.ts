/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { RFPResponse } from './rFPResponse';
import type { ProposalSingleResponseInputFileId } from './proposalSingleResponseInputFileId';

export interface ProposalSingleResponseInput {
  info: string;
  rfp: RFPResponse;
  comment: string;
  fileId?: ProposalSingleResponseInputFileId;
}

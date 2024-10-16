package no.oslomet.john_job_seeker.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public interface PDFService {
    String parsePdfToText(MultipartFile pdfFile) throws IOException;
}

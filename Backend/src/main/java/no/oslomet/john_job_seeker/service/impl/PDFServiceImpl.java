package no.oslomet.john_job_seeker.service.impl;

import no.oslomet.john_job_seeker.service.PDFService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class PDFServiceImpl implements PDFService {

    public String parsePdfToText(MultipartFile pdfFile) throws IOException {
        try(final PDDocument document = Loader.loadPDF(pdfFile.getBytes())){
            final PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }

}

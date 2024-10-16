package no.oslomet.john_job_seeker.controller;

import no.oslomet.john_job_seeker.service.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/api/document")
@CrossOrigin
public class PdfController {

    @Qualifier("PDFServiceImpl")
    @Autowired
    private PDFService pdfService;

    @PostMapping("/pdfparser")
    public String home(@RequestParam("file") MultipartFile file) throws IOException {
        return pdfService.parsePdfToText(file);
    }

}

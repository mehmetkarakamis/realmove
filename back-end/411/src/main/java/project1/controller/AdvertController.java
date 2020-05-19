package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project1.DTO.AdvertDTO;
import project1.model.Advert;
import project1.service.IAdvertService;
import project1.utils.RestPreconditions;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/advert")
public class AdvertController {

    @Autowired
    private IAdvertService advertService;

    @GetMapping
    public List<Advert> findAll() {
        return advertService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Advert getById(@PathVariable Long id) {
        return advertService.findById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Advert create(@ModelAttribute AdvertDTO advertDTO, @RequestParam MultipartFile[] pictures) {



        return advertService.create(advertDTO,pictures);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Advert update(@PathVariable( "id" ) Long id, @RequestBody Advert advert) {
        RestPreconditions.checkFound(advert);
        return advertService.update(id, advert);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        advertService.deleteById(id);
    }

}

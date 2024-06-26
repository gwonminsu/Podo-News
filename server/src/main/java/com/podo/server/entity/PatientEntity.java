package com.podo.server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "patient")

public class PatientEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column
    private Integer age;

    @Column
    private Boolean gender;

    @Column
    private Integer weight;

    @Column
    private Integer height;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String nickname;

    @Column
    @Builder.Default
    private Boolean isEmail = false;

    @Column
    @Builder.Default
    private Boolean isFist = true;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String profileImageBase64;

    @Column
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime updated;

    @ToString.Exclude
    @OneToMany(mappedBy = "patientUuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PatientDiseaseBridgeEntity> patientUuid = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "patientUuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PrescriptionEntity> prescriptions = new ArrayList<>();


}

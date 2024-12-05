import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../firebase/supabaseClient';

const EditPage = () => {
  const { id } = useParams(); // Get the ID from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bishoyBiboron: '',
    upodeshtarDepto: '',
    seniorSecretaryDepto: '',
    atikSecretaryLaw: '',
    additonalSecretaryLaw: '',
    jnSecretaryLaw: '',
    adhiShakha: '',
    atikSecretaryDiscipline: '',
    anuVibhagDiscipline: '',
    jnSecretaryDiscipline: '',
    adhiShakhaDiscipline: '',
    lawShakha: '',
    disciplineShakha: '',
    lawShakhaNumber: '',
    disciplineShakhaNumber: '',
    suparishComment: '',
    diaryNo: '',
    internalDepto: '',
    externalDepto: '',
    signatureSeal: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('compose').select().eq('id', id).single();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setFormData({
          ...data
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('compose').update({
        bishoy_biboron: formData.bishoyBiboron,
        upodeshtar_depto: formData.upodeshtarDepto,
        senior_secretary_depto: formData.seniorSecretaryDepto,
        atik_secretary_law: formData.atikSecretaryLaw,
        anu_vibhag: formData.additonalSecretaryLaw,
        atik_secretary_discipline: formData.atikSecretaryDiscipline,
        anu_vibhag_discipline: formData.anuVibhagDiscipline,
        law_shakha: formData.lawShakha,
        discipline_shakha: formData.disciplineShakha,
        law_shakha_number: formData.lawShakhaNumber,
        discipline_shakha_number: formData.disciplineShakhaNumber,
        suparish_comment: formData.suparishComment,
        diary_no: formData.diaryNo,
        internal_depto: formData.internalDepto,
        external_depto: formData.externalDepto,
        signature_seal: formData.signatureSeal
      }).eq('id', id);

      if (error) {
        console.error('Error updating data:', error);
      } else {
        navigate('/dashboard'); // Redirect to dashboard after successful update
      }
    } catch (err) {
      console.error('Unexpected error during update:', err);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontWeight: 'bold', fontSize: '2.5rem' }}>
        Edit Data
      </h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Same form fields as the ComposePage, populate with formData */}
        <div style={{ marginBottom: '10px' }}>
          <label>বিষয় / বিবরণ:</label>
          <input
            type="text"
            name="bishoyBiboron"
            value={formData.bishoyBiboron}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        {/* Other fields here... */}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;

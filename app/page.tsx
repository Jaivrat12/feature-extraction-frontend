'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import ReportFeatures from '@/components/ReportFeatures';
import UploadForm from '@/components/UploadForm';
import CustomErrorUI from '@/components/Common/CustomErrorUI';
import { axiosClient } from '@/lib/axios';
import type { FormEvent } from 'react';
import type ReportFeaturesData from '@/types/ReportFeaturesData';

export default function Home() {
    const [reportFeatures, setReportFeatures] =
        useState<ReportFeaturesData | null>(null);
    const [error, setError] = useState('');

    const uploadFile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        setReportFeatures(null);
        setError('');

        try {
            const res = await axiosClient.post<ReportFeaturesData>(
                '/bsa_reports/upload',
                form
            );
            setReportFeatures(res.data);
            if (e.target instanceof HTMLFormElement) {
                e.target.reset();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.detail ?? error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="py-12 container">
            <h2 className="text-2xl mb-4">
                Upload BSA Report (JSON) File
            </h2>

            <UploadForm
                onSubmit={uploadFile}
                className="mb-8"
            />

            {error && (
                <CustomErrorUI
                    title="Upload Error"
                    message={error}
                />
            )}

            {reportFeatures && <ReportFeatures data={reportFeatures} />}
        </div>
    );
}
